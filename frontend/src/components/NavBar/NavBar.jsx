import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { signOut } from "../../Redux/actions/userActions";
import { Button } from "@mui/material";
export default function NavBar() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
    navigate("/signin");
  };
  return (
    <>
      <nav className=" sticky navbar navbar-expand-lg navbar-light bg-light px-1 px-md-5 py-md-4 border-3 border-bottom border-secondary ">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img
              src="https://i.ibb.co/tmgjH6R/logo.png"
              alt="logo"
              width="130px"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto me-0">
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Contact Us
                </Link>
              </li>
            </ul>

            {!userInfo ? (
              <Link
                className="cart position-relative mx-4 d-none d-sm-none d-md-none d-lg-block text-decoration-none text-dark"
                to="/signin"
              >
                <i className="fas fa-shopping-cart fs-4"></i>
                {cartItems.length > 0 && (
                  <span className="badge   position-absolute top-4 start-100 translate-middle">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                className="cart position-relative mx-4 d-none d-sm-none d-md-none d-lg-block text-decoration-none text-dark"
                to="/cart"
              >
                <i className="fas fa-shopping-cart fs-4"></i>
                {cartItems.length > 0 && (
                  <span className="badge   position-absolute top-4 start-100 translate-middle">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="cart">
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#" className="userName">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown_content">
                    <Button onClick={signOutHandler} className="signoutBtn">
                      Sign Out
                    </Button>
                  </ul>
                </div>
              ) : (
                <Link to="/signin" className="signIn">
                  <Button> Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// import "./NavBar.css";
// import { signOut } from "../../Redux/actions/userActions";
// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const pages = ["Home", "About", "Contact Us"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function NavBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.userSignin);
//   const dispatch = useDispatch();
//   const signOutHandler = () => {
//     dispatch(signOut());
//   };
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" style={{backgroundColor:"#EBEFF2" ,color:"black"}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>

//        <Link to="/">
//        <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             <img
//               src="https://i.ibb.co/tmgjH6R/logo.png"
//               alt="logo"
//               width="130px"
//             />

//           </Typography>
//        </Link>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           <Tooltip>
//             <Link
//               className="cart  position-relative mx-4 d-none d-sm-none d-md-none d-lg-block text-decoration-none text-dark"
//               to="/cart"
//             >
//               <i className="fas fa-shopping-cart fs-4"></i>
//               {cartItems.length > 0 && (
//                 <span className="badge   position-absolute top-4 start-100 translate-middle">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           </Tooltip>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip >
//               {userInfo ? (
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar
//                     alt={userInfo.name}
//                     src="/static/images/avatar/2.jpg"
//                   />
//                 </IconButton>
//               ) : (
//                 <Link to="/signin" className="signIn">
//                   <Button style={{ color: "black" }}> Sign In</Button>
//                 </Link>
//               )}
//             </Tooltip>

//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               <MenuItem style={{ display: "block" }}>
//                 <Typography onClick={signOutHandler} textAlign="center">
//                   Logout
//                 </Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default NavBar;
