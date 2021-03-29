<template>
    <b-navbar toggleable="lg" type="dark" class="navbar">
        <b-navbar-brand href="#" class="h1 ml-5 mr-5" style="color: #FFFAF0;">Scheduling App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#" class="ml-5">Opis projektu</b-nav-item>
                <b-nav-item href="#" class="ml-5">Problem rozplanowania pociągów</b-nav-item>
                <b-nav-item href="#" class="ml-5">Problem rozplanowania zajęć</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  
}
</script>


<style scoped>
    .navbar{
        background: #8e2de2; /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #8e2de2, #4a00e0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .nav-item{
        text-align: center;
    }
</style>