-- Script to initialize the database with tables and sample data

CREATE TABLE IF NOT EXISTS forum_user (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS thread (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES forum_user(id) ON DELETE CASCADE,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vote (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES forum_user(id) ON DELETE CASCADE,
    thread_id UUID NOT NULL REFERENCES thread(id) ON DELETE CASCADE
);

INSERT INTO forum_user (id, username, address, password, role) 
VALUES 
    ('2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e', 'john_doe', '123 Main St', 'password123', 'ADMIN')
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
