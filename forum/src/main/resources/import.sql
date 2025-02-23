-- Insertar Usuario base

INSERT INTO forum_user (id, username, address, password, role) VALUES (2, 'john_doe', '123 Main St', 'password123', 'ADMIN');

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
