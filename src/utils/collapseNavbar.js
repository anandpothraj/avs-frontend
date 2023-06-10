export const collapseNavbar = () => {
    let navbar = document.querySelector('#responsive-navbar-nav');
    let navbar2 = document.querySelector('.navbar-toggler');
    let navClass = navbar.classList;
    let navClass2 = navbar2.classList;
    if (navClass.contains('show')) {
        navClass.remove('show');
        navClass2.add('collasped');
    }
}