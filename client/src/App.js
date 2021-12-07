import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';

// Component Imports
import PrivateRoute from './components/PrivateRoute';

// Page Imports
import SigninPage from './pages/SigninPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ContactsPage from './pages/ContactsPage';
import ContactEdit from './pages/ContactEdit';
import GroupToDo from './pages/GroupToDo';
import GroupToDoEdit from './pages/GroupToDoEdit';
import UserBio from './pages/UserBio';
import UserBioView from './pages/UserBioView';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import Grocery from './pages/Grocery';
import GroceryEdit from './pages/GroceryEdit';
import Recipe from './pages/Recipe';
import RecipeEdit from './pages/RecipeEdit';

const PageWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const Header = styled.header`
background-color: rgb(64, 62, 64);
display: flex;
justify-content: space-between;
padding: 20px 0 20px 0;
margin: 0;
align-items: center;
height: 5vh;

div {
  width: 50%;
  margin-left: 5%;
}
`;

const Main = styled.main`
background-color: rgb(87, 91, 99);
`;

const NavLinks = styled.div`
display: flex;
`;

const Logo = styled(Link)`
font-size: 30px;
text-decoration: none;
cursor: poiter;
color: white;
`;

const DropContent = styled.ul`
position: absolute;
min-width: 8rem;
padding: .5rem;
z-index: 1;
margin: 0;
margin-top: .3rem;
border-radius: 0.5rem;
background-color: black;
list-style: none;
visibility: hidden;
transition: 0.2s .2s;

li a {
  font-size: 15px;
  text-decoration: none;

  &:hover {
    opacity: .65;
  }
}
`;

const Drop = styled.div`
position: relative;
margin-left: 0;
a {
  font-size: 20px;
  align-items: center;
  text-decoration: none;
  color: white;
}
&:hover ${DropContent} {
  visibility: visible;
  transition: 0s;
}
`;

function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = (e) => {
    e.preventDefault();

    dispatch(signout());
  }

  return (
    <Router>
      <Routes>
        <Route exact path = '/' element = {<SigninPage/>} />
      </Routes>
      <PageWrapper>
        {userInfo && (
          <Header>
            <div>
              <Logo to = '/dashboard'>HomeOps</Logo>
            </div>
            <NavLinks>
              <Drop>
                <Link to = '#'>Home Utils</Link>
                <DropContent>
                  <li><Link to = '/userbio'>User Bios</Link></li>
                  <li><Link to = '/grouptodo'>To-Do-List</Link></li>
                  <li><Link to = '#'>Calendar</Link></li>
                  <li><Link to = '#'>Calculator</Link></li>
                </DropContent>
              </Drop>
              <Drop>
                <Link to = '#'>Grocery Utils</Link>
                <DropContent>
                  <li><Link to = '/grocery'>Grocery List</Link></li>
                  <li><Link to = '/recipe'>Recipes</Link></li>
                </DropContent>
              </Drop>
              <Drop>
                <Link to = '#'>{userInfo.firstName}</Link>
                <DropContent>
                  <li><Link to = '/profile'>Profile</Link></li>
                  <li><Link to = '#'>To-Do-List</Link></li>
                  <li><Link to = {`/contacts/${userInfo._id}`}>Contact List</Link></li>
                  {userInfo.isAdmin && <li><Link to = '/users'>Users</Link></li>}
                  <li><Link to = '#signout' onClick = {signoutHandler}>Sign Out</Link></li>
                </DropContent>
              </Drop>
            </NavLinks>
          </Header>
        )}
        <Main>
          <Routes>
            <Route 
              exact path = '/contact/:id/:cid' 
              element = {
                <PrivateRoute>
                  <ContactEdit/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/dashboard' 
              element = {
                <PrivateRoute>
                  <Dashboard/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/profile' 
              element = {
                <PrivateRoute>
                  <Profile/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/contacts/:id' 
              element = {
                <PrivateRoute>
                  <ContactsPage/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/grouptodo' 
              element = {
                <PrivateRoute>
                  <GroupToDo/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/grouptodo/:id/edit' 
              element = {
                <PrivateRoute>
                  <GroupToDoEdit/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/userbio' 
              element = {
                <PrivateRoute>
                  <UserBio/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/users' 
              element = {
                <PrivateRoute>
                  <Users/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/users/:id' 
              element = {
                <PrivateRoute>
                  <UserEdit/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/grocery' 
              element = {
                <PrivateRoute>
                  <Grocery/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/grocery/:id' 
              element = {
                <PrivateRoute>
                  <GroceryEdit/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/recipe' 
              element = {
                <PrivateRoute>
                  <Recipe/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/recipe/:id' 
              element = {
                <PrivateRoute>
                  <RecipeEdit/> 
                </PrivateRoute>
              }
            />
            <Route 
              exact path = '/userbio/:id' 
              element = {
                <PrivateRoute>
                  <UserBioView/> 
                </PrivateRoute>
              }
            />
          </Routes>
        </Main>
      </PageWrapper>
    </Router>
  );
}

export default App;

