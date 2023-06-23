import {BrowserRouter,Route,Routes} from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import AllPostPage from './AllPostPage';
import OnePostPage from './OnePostPage';
import LoginPage from './LoginPage';
import BlogPage from './BlogPage';
import PostWriteEditPage from './PostWriteEditPage';
import CategoryPage from './CategoryPage';
import RecoilTestPage from './RecoilTestPage';
import ProfilePage from './ProfilePage';
import AdminPage from './AdminPage';
import SignUpPage from './SignUpPage';

const Pages = (props) => {
    return (
            <Routes>
                <Route exact path='/' element={<MainPage />} />
                <Route exact path='/post/:postid' element={<OnePostPage />} />
                <Route exact path='/post/:postid/edit' element={<PostWriteEditPage editMode={true} />} />
                <Route exact path='/signin' element={<LoginPage />} />
                <Route exact path='/signup' element={<SignUpPage />} />
                <Route exact path='/post' element={<CategoryPage />} />
                <Route exact path='/category/:catname' element={<CategoryPage />} />
                <Route exact path='/category/:catname/write' element={<PostWriteEditPage />} />
                <Route exact path='/post/write' element={<PostWriteEditPage />} />
                <Route exact path='/profile' element={<ProfilePage />} />
                <Route exact path='/profile/:useremail' element={<ProfilePage />} />
                <Route exact path='/admin' element={<AdminPage />} />
            </Routes>
    );
};

export default Pages;