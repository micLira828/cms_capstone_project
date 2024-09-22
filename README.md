# CMS CREATOR 

## Database Schema Design

![db-schema](db-schema.png)

[db-schema]: ./images/example.png

## API Documentation


### Get All Posts of a blog

Gets all of a blogs posts

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/blogs/:blogId/posts
  * Body: false

* Successful Response when the posts of a blog are retreived successfully
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  
     { "Blog": {
        "id":1,
        "userId": 1,
        "title": "Demo of Extreme Wellness",
        "Posts": [
            {
              "userId": 1,
                "blogId": 1,
                 "title": "My New Post",
                 "postEntry": "This is a test post entry. Hopefully the passage of your blog post will be longer",
                 "createdAt": "2021-11-19 20:39:36",
                 "updatedAt": "2021-11-20 10:06:40"
            }
        ]
      }}

--------------------------

### Create a new post for a blog
  Create a new post for a blog

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/blogs/:blogId/posts
  * Body: 

    ```json
    {
      "userId": 1,
      "blogId": 1,
      "title": "My New Post",
      "postEntry": "This is a test post entry. Hopefully the passage of your blog post will be longer",
    }

* Successful Response when a post of a blog is created successfully
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
    {
      "User": {
        "id": 1,
        "email": "demo@user.io",
        "username": "Demo-lition",
        "firstName": "Demo",
        "lastName": "Lition",
      },
      "Blog": {
        "id":1,
        "userId": 1,
        "title": "Demo of Extreme Wellness"
      },
      "title": "My New Post",
      "postEntry": "This is a test post entry. Hopefully the passage of your blog post will be longer",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }


  ------------------

  
### Update a new blog post
  Create a new post for a blog

* Require Authentication: true
* Request
  * Method: PUT, PATCH
  * URL: /api/blogs/:blogId/posts/:postId
  * Body: 
    * Body:

    ```json
    {
      "userId": 1,
      "blogId": 1,
      "title": "My New Post",
      "postEntry": "This is a test post entry. Hopefully the passage of your blog post will be longer",
    }

* Successful Response when the posts of a blog are retreived successfully
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
     ```json
    {
      "userId": 1,
      "blogId": 1,
      "title": "My New Post",
      "postEntry": "This is a test post entry. Hopefully the passage of your blog post will be longer",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }


  --------------------------
  
### Delete a blog post
  Delete a post for a blog

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/blogs/:blogId/posts/:postId
  * Body: none

* Successful Response when the posts of a blog are retreived successfully
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
    {
      "message": "Successfully deleted"
    }
    ```
  

