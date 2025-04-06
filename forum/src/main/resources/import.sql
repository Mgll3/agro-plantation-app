-- Script to initialize the database with tables and sample data
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS forum_user (
    id UUID PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS thread (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES forum_user(id),
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vote (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES forum_user(id),
    thread_id UUID NOT NULL REFERENCES thread(id) ON DELETE CASCADE,
    is_upvote BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO forum_user (id, username, address, password, role) 
VALUES 
    ('2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e', 'john_doe', '123 Main St', 'password123', 'ADMIN'),
    ('3f9f9f9f-9f9f-9f9f-9f9f-9f9f9f9f9f9f', 'jane_doe', '456 Elm St', 'password456', 'USER')
ON CONFLICT (id) DO NOTHING;

INSERT INTO thread (id, title, content, author_id, is_visible) 
VALUES 
    ('5a1cfe92-5eb0-41f2-905a-f66b974d5e05', 'First Thread', 'This is the content of the first thread.', '2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e', TRUE),
    ('6b2dfe93-6eb1-52f3-916b-f77c085e6f16', 'Second Thread', 'This is the content of the second thread.', '3f9f9f9f-9f9f-9f9f-9f9f-9f9f9f9f9f9f', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Query Mongo para traer los hilos con los detalles del autor
-- db.threads.aggregate([
--     {
--         $lookup: {
--             from: "forum_user",
--             localField: "author",
--             foreignField: "_id",
--             as: "authorDetails"
--         }
--     },
--     {
--         $unwind: "$authorDetails"
--     },
--     {
--         $addFields: {
--             author: "$authorDetails"
--         }
--     },
--     {
--         $project: {
--             authorDetails: 0
--         }
--     }
-- ])
