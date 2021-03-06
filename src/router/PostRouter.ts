import { Request, Response, Router } from 'express';
import Post from '../models/Post';

export class PostRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the posts in the database
  public all(req: Request, res: Response): void {
    Post.find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.json({ error });
    });
  }

  public like(req: Request, res: Response): void {
    const id: string = req.params.id;
    console.log(id)
    Post.findOne({_id: id})
      .then((post) => {
        console.log("post", post)
        post.likes += 1;
        post.save()
          .then((data) => {
            res.status(204).json({ data });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  }

  public unLike(req: Request, res: Response): void {
    const id: string = req.params.id;
    Post.findOne({_id: id})
      .then((post) => {
        post.likes > 0 ? post.likes -= 1 : "";
        
        post.save()
          .then((data) => {
            res.status(204).json({ data });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      })
  }

  // get a single post by params of '_id'
  public one(req: Request, res: Response): void {
    const id: string = req.params.id;
    
    Post.findOne({_id: id})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  // create a new post
  public create(req: Request, res: Response): void {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const featuredImage: string = req.body.featuredImage;
    const categories = req.body.categories;
    const citations = req.body.citations;
    console.log('req.body', req.body)
    if (!title || !content) {
      res.status(422).json({ message: 'All Fields Required.' });
    } else {
      console.log("hello", req.body)

      const post = new Post({
        title,
        content,
        featuredImage,
        categories,
        citations
      });

      post.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    }
    
  }

  // update post by params of 'id'
  public update(req: Request, res: Response): void {
    const id: string = req.params.id;
    Post.findByIdAndUpdate(id, req.body, {new: true})
    .then((data) => {
      console.log(data)
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  // delete post by params of 'id'
  public delete(req: Request, res: Response): void {
    const id: string = req.params.id;
    Post.findByIdAndRemove(id)
    .then((obj) => {
      console.log(obj)
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }



  public routes() {
    this.router.get('/', this.all);
    this.router.get('/:id', this.one);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.put('/:id/like', this.like);
    this.router.put('/:id/unlike', this.unLike);
    this.router.delete('/:id', this.delete);
  }

}

const postRoutes = new PostRouter();
postRoutes.routes();
const router = postRoutes.router;
export default router;
