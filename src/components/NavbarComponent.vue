<template>
    <b-navbar toggleable="lg" type="dark" class="navbar">
        <router-link to="/" class="h4 ml-5 mr-5 router-link app-text" style="color: #FFFAF0;">Scheduling App</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/projectDescription" class="router-link ml-5">Opis projektu</router-link>
                <router-link to="/projectDescription" class="router-link ml-5">Problem rozplanowania pociągów</router-link>
                <router-link to="/projectDescription" class="router-link ml-5">Problem rozplanowania zajęć</router-link>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
}
</script>


<style scoped>

    .router-link{
        color: #f2d9f2;
        text-decoration: none;
    }

    .router-link:hover{
        color: #e6b3e6;
        text-decoration: none;
    }


    .navbar{
        background: #8e2de2; /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #8e2de2, #4a00e0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .nav-item{
        text-align: center;
    }
</style>