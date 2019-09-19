import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const LogOut = () => {
    const logUserOut = () => {
        window.localStorage.removeItem('loggedUser')
    }
    return (
        <button onClick={() => {logUserOut()}}>Logout</button>
    )
}

const AddBlog = ({user, title, setTitle, author, setAuthor, url, setUrl, setErrorMessage}) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const blog = await blogService.create({
                title, author, url, user
            })
            setErrorMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
            
        } catch(e) {
            setErrorMessage('blog was not added')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleSubmit}>
            title: 
            <input
                type='text'
                value={title}
                name='title'
                onChange={({target}) => setTitle(target.value)}
            />
            author: 
            <input
                type='text'
                value={author}
                name='author'
                onChange={({target}) => setAuthor(target.value)}
            />
            url: 
            <input
                type='text'
                value={url}
                name='url'
                onChange={({target}) => setUrl(target.value)}
            />
            <button type='submit'>create</button>
            </form>
        </div>
    )
}


const Dashboard = ({user, blogs, title, setTitle, author, setAuthor, url, setUrl, errorMessage, setErrorMessage}) => {
    return (
    <div>
        <p>
        {errorMessage}
        </p>
        Hello {user.username}
        <LogOut />
        <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
        <AddBlog 
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            user={user}
            setErrorMessage={setErrorMessage}
        />

    </div>
    )
}

export default Dashboard