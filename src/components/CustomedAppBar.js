import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CircularProgress, Link } from '@mui/material';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import DrawerofCategories from './DrawerofCategories';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  let splitted = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: (splitted.length > 1 ? `${splitted[0][0]}${splitted[1][0]}` :`${splitted[0][0]}`),
  };
}


function CustomedAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cateOpen,setCateOpen] = React.useState(false);
  const [user,setUser] = useRecoilState(userState);
  const [loading, setLoading] = React.useState(true);
  const [token,setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();

  const pages = [{content:'HOME',url:'/'}, {content:'최신 글',url:'/post/'}];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const profileAction = ()=>{
    navigate(`/profile/${user.username}`);
    handleCloseUserMenu();
}
const logoutAction = ()=>{
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
    handleCloseUserMenu();
}
const adminAction =()=>{
  navigate('/admin');
  handleCloseUserMenu();
}

const signedSettings = [{content:'Profile',action:profileAction},{content:'Logout',action:logoutAction}];

  React.useEffect(()=>{
    async function lel(){ // refreshing and getMe.
      try{
        let accToken = localStorage.getItem('nT');
        let refToken = localStorage.getItem('refreshToken');
        if(accToken && refToken){
          axios.defaults.headers.common.Authorization=`Bearer ${accToken}`;
          const response = await axios.post('/auth/refresh',{
            refreshToken:refToken
          },{
            "Content-Type":"application/json"
          });
          localStorage.setItem('nT',response.data.data.token);
          localStorage.setItem('refreshToken',response.data.data.refreshToken);
          setToken(response.data.data.token);
        }else{
          setLoading(false);
        }
      }catch(err){
        if(err.response.status===403){
          setToken(null);
          setUser(null);
          localStorage.removeItem('nT');
          localStorage.removeItem('refreshToken');
        }else{
          console.error(err);
        }
        setLoading(false);
      }
    }
    lel();
  },[])

  React.useEffect(()=>{
    async function getME(){
      try{
        if(token){
          setLoading(true);
          axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
          const response = await axios.get('/user/me');
          setUser(response.data.data);
          setLoading(false);
        }
      }catch(err){
        console.error(err);
        setLoading(false);
      }
    }
    getME();
  },[token]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <DrawerofCategories open={cateOpen} setOpen={setCateOpen}/>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsertCommentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Noto Sans KR',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            THXX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.content} onClick={handleCloseNavMenu}>
                  <Link href={page.url}>
                    <Typography textAlign="center">{page.content}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Link onClick={()=>{setCateOpen(true);handleCloseNavMenu()}}>
                  <Typography textAlign='center'>카테고리</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <InsertCommentIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Noto Sans KR',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            THXX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.url} key={page.content}>
                <Button
                  key={page.content}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.content}
                </Button>
              </Link>
            ))}
            <Link><Button onClick={()=>{setCateOpen(true)}} sx={{my:2,color:'white',display:'block'}}>카테고리</Button></Link>
          </Box>
              {user && <Typography>{user.username} </Typography>}
          {loading ? <CircularProgress color="secondary" /> : (user ? 
          
          
          
          <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} {...stringAvatar(user.username)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {signedSettings.map((setting) => (
                <MenuItem key={setting.content} onClick={setting.action}>
                  <Typography textAlign="center">{setting.content}</Typography>
                </MenuItem>
              ))}
              {user && user.isAdmin && 
              <MenuItem onClick={adminAction}>
                  <Typography textAlign="center">ADMIN</Typography>
              </MenuItem>}
            </Menu>
          </Box> :
           <Box sx={{flexGrow:0}}><Link href="/signin" color="secondary">로그인</Link> <Link href="/signup" color="secondary">회원가입</Link></Box>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomedAppBar;