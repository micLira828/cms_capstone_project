# CMS CREATOR 

## Database Schema Design

![db-schema](db-schema.png)

[db-schema]: ./images/example.png

## API Documentation

### Get all blogs
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/blogs
  * Body: none

  
 * Response: Successfully retreive all blogs
   * Status Code: 200
   * Headers:
    * Content-Type: application/json
   * Body:
    ```json
      
     { "Blogs": [{
        "id":1,
        "User": {
            "id": 1,
            "email": "demo@user.io",
            "username": "demo-lition",
            "firstName": "Demo",
            "lastName": "Lition",
        },
        "title": "Demo of Extreme Wellness",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-20 10:06:40"
     }]}


---------------------------

### Get all blogs of a user

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/users/:userId/blogs
  * Body: none

    
* Response: Successfully retreive all blogs
    * Status Code: 200
    * Headers:
    * Content-Type: application/json
    * Body:
        ```json
        
        {"User": {
                "id": 1,
                "email": "demo@user.io",
                "username": "demo-lition",
                "firstName": "Demo",
                "lastName": "Lition",
            },
            "Blogs": [{
            "id":1,
            "title": "Demo of Extreme Wellness",
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-20 10:06:40"
        }]}

----------------------------------
### Get all blogs of the current user
* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/blogs/current
  * Body: none

* Response: Successfully retreive all blogs
  * Status Code: 200
  * Headers:
   * Content-Type: application/json
   * Body:
    ```json
      
     {"Blogs": [{
        "id":1,
        "title": "Demo of Extreme Wellness",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-20 10:06:40"
     }]}

----------------------------

### Create a blog

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/blogs
  * Body: 

  
    ```json
    {
      "userId": 1,
       "title": "Demo of Extreme Wellness"
    }

* Response: Successful Response when a blog is created successfully
    * Status Code: 201
    * Headers:
    * Content-Type: application/json
    * Body:
     ```json
      
     { "Blog": {
        "id":1,
        "User": {
            "id": 1,
            "email": "demo@user.io",
            "username": "demo-lition",
            "firstName": "Demo",
            "lastName": "Lition",
        },
        "title": "Demo of Extreme Wellness",
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-20 10:06:40"
     }}

------------------------

### Update a blog

* Require Authentication: true
* Request
  * Method: PUT, PATCH
  * URL: /api/blogs/:blogId
  * Body: 

  
    ```json
    {
      "userId": 1,
       "title": "Demo of Extreme Wellness"
    }

* Response: Successful Response when a blog is created successfully
  * Status Code: 200
  * Headers:
   * Content-Type: application/json
    * Body:

     ```json
    {
      "userId": 1,
      "title": "Demo of Ultimate Wellness",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }

 


------------------------

### Delete a blog

  Delete a blog

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/blogs/:blogId
  * Body: none

* Response: Successful Response when the posts of a blog are retreived successfully
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
    {
      "message": "Successfully deleted"
    }
    ```
------------------------------------

### Get All Posts of a blog

Gets all of a blogs posts

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/blogs/:blogId/posts
  * Body: false

* Response: Successful Response when the posts of a blog are retreived successfully
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

* Response: Successful Response when a post of a blog is created successfully
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

* Response: Successful Response when the posts of a blog are retreived successfully
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

* Response: Successful Response when the posts of a blog are retreived successfully
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
    {
      "message": "Successfully deleted"
    }
    ```
  

