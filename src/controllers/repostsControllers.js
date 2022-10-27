import * as shareRepository from "../repositories/shareRepository.js";

export async function Reposts (req, res) {
    const { id } = req.body;

    const userId = res.locals.userId;

    if (!id) {
        return res.status(422).send("Id do post não foi enviado.");
    }

    try {
        const getId = await shareRepository.getRepostsInfo({id});

        if (!getId.rows[0].postId) {
            return res.status(404).send("Post inexistente.");
        }

        const userIdConfirmation = await shareRepository.getUserById({userId});
        const user = userIdConfirmation.rows[0].id;
       
        await shareRepository.insertRepost({
            postId: getId.rows[0].postId,
            id: user
        });

        const posts = await shareRepository.getPostInfo({
            postId: getId.rows[0].postId,
            id: user
        });

        const profilePicture = await shareRepository.getProfilePicture({
            postId: getId.rows[0].postId
        });

        const likes = await shareRepository.getAllPostLikes({
            postId: getId.rows[0].postId
        });

        const repostsQTD = await shareRepository.getAllRepostsQTD({
            postId: getId.rows[0].postId
        });
        
        const comments = await shareRepository.getAllPostComments({
            postId: getId.rows[0].postId
        });

        const repostForm = {
            postInfo: posts.rows[0],
            profilePicture: profilePicture.rows[0].profilePicture,
            postLikes: likes.rows[0].likes,
            reposts: repostsQTD.rows[0].repostsQTD,
            comments: comments.rows[0].comments
        }

        res.status(201).send(repostForm);

    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
}