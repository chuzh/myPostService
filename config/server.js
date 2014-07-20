'use strict';

exports.config = {
    mongo: {
        shared: {
            hosts: [
                {
                    server: process.env.MONGO_S1_HOST || '127.0.0.1',
                    port: process.env.MONGO_S1_PORT || 27017
                },
                {
                    server: process.env.MONGO_S2_HOST || '127.0.0.1',
                    port: process.env.MONGO_S2_PORT || 27018
                },
                {
                    server: process.env.MONGO_S3_HOST || '127.0.0.1',
                    port: process.env.MONGO_S3_PORT || 27019
                }
            ]
        },
        environments: {
            development: {
                database: 'posts_development'
            },
            test: {
                database: 'posts_test'
            },
            production: {
                database: 'posts'
            }
        }
    }
};
