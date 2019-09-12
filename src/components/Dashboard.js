import React from 'react'
import Blog from './Blog'


const Dashboard = ({user, blogs}) => {
    return (
    <div>
        Hello {user.username}
        <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>

    </div>
    )
}

export default Dashboard