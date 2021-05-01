<template>
    <b-navbar toggleable="lg" type="dark" class="navbar bg-dark">
        <router-link to="/" class="h4 ml-5 mr-5 router-link text-light">Scheduling App</router-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link to="/projectDescription" class="router-link text-light ml-5">Opis projektu</router-link>
                <router-link to="/projectDescription" class="router-link text-light ml-5">Problem rozplanowania pociągów</router-link>
                <router-link to="/projectDescription" class="router-link text-light ml-5">Problem rozplanowania zajęć</router-link>
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
        text-decoration: none;
    }

    .router-link:hover{
        color: #e6b3e6;
        text-decoration: none;
    }

    .nav-item{
        text-align: center;
    }


</style>