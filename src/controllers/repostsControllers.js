import * as shareRepository from "../repositories/shareRepository.js";

export async function Reposts (req, res) {
    const { id } = req.body;

    const userId = res.locals.userId;

    if (!id) {
        return res.status(422).send("Id do post não foi enviado.");
    }

    try {
        const getId = await shareRepository.getRepostsInfo({id});
        const confirmPost = getId.rows.map(item => item.id);
        if (!confirmPost[0]) {
            return res.status(404).send("Post inexistente.");
        }

        const userIdConfirmation = await shareRepository.getUserById({userId});
        const userExists = userIdConfirmation.rows.map(item => item.id);
        if (!userExists[0]) {
            return res.sendStatus(401);
        }
        const user = userIdConfirmation.rows[0].id;
       
        await shareRepository.insertRepost({
            postId: getId.rows[0].postId,
            id: user
        });

        res.status(201).send("O repost foi concluido.");
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function ListReposts (req, res) {
    const userId = res.locals.userId;
    try {
        const post = await shareRepository.getLastRepost();

        const posts = await shareRepository.getPostInfo({
            postId: post.rows[0].postId,
            id: userId
        });

        const profilePicture = await shareRepository.getProfilePicture({
            postId: post.rows[0].postId
        });

        const likes = await shareRepository.getAllPostLikes({
            postId: post.rows[0].postId
        });

        const repostsQTD = await shareRepository.getAllRepostsQTD({
            postId: post.rows[0].postId
        });
        
        const comments = await shareRepository.getAllPostComments({
            postId: post.rows[0].postId
        });

        const repostForm = {
            postInfo: posts.rows[0],
            profilePicture: profilePicture.rows[0].profilePicture,
            postLikes: likes.rows[0].likes,
            reposts: repostsQTD.rows[0].repostsQTD,
            comments: comments.rows[0].comments
        }

        res.status(200).send(repostForm);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function RepostsQTD (req, res) {
    const { postId } = req.params;
    try {
        const repostsQTD = await shareRepository.getAllRepostsQTD({ postId });
        const confirmPost = repostsQTD.rows.map(item => item.repostsQTD);
        if (!confirmPost[0]) {
            return res.status(404).send("Post inexistente.");
        }
        res.status(200).send({reposts: confirmPost[0]});
    } catch (error) {
        res.sendStatus(500);
    }
}