import { Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { auth } from './auth.config';

@Module({})
export class AuthModule implements OnModuleInit {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  async onModuleInit(): Promise<void> {
    const httpAdapter = this.adapterHost.httpAdapter as FastifyAdapter;
    const fastify: FastifyInstance = httpAdapter.getInstance();

    // await the register call so the function truly uses await
    await fastify.register(fastifyCors, {
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true,
      maxAge: 86400,
    });

    fastify.route({
      method: ['GET', 'POST'],
      url: '/api/auth/*',
      async handler(request, reply) {
        try {
          // Construct request URL
          const url = new URL(request.url, `http://${request.headers.host}`);

          // Convert Fastify headers to standard Headers object
          const headers = new Headers();
          Object.entries(request.headers).forEach(([key, value]) => {
            if (value) headers.append(key, value.toString());
          });

          // Create Fetch API-compatible request
          const req = new Request(url.toString(), {
            method: request.method,
            headers,
            body: request.body ? JSON.stringify(request.body) : undefined,
          });

          // Process authentication request
          const response = await auth.handler(req);

          // Forward response to client
          reply.status(response.status);
          response.headers.forEach((value, key) => reply.header(key, value));
          reply.send(response.body ? await response.text() : null);
        } catch (error) {
          fastify.log.error('Authentication Error:', error);
          reply.status(500).send({
            error: 'Internal authentication error',
            code: 'AUTH_FAILURE',
          });
        }
      },
    });
  }
}
