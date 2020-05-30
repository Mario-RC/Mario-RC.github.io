<?php 
if(isset($_POST['submit'])){
    $to = "mario.rcantelar@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $full_name = $_POST['full_name'];
    $subject = "Form submission";
    $subject2 = "Copy of your form submission";
    $message = $full_name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $full_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $full_name . ", I will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-167408286-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-167408286-1');
    </script>

    <!--  CSS Style -->
    <link rel="stylesheet" href="assets/css/style.css">
    <!--  Font-Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

    <!--  Open Graph Description META Tags -->
    <meta property="og:title" content="Mario Rodríguez-Cantelar">
    <meta property="og:description" content="My personal page.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://mario-rc.github.io/blog.html">
    <meta property="og:image" content="https://mario-rc.github.io/assets/img/og.jpg">
    <meta property="og:image:type" content="image/jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="800">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Mario Rodríguez-Cantelar">
    <meta name="twitter:description" content="My personal website.">
    <meta name="twitter:image" content="assets/img/og.png">
    <!--  Non-Essential, But Recommended -->
    <meta property="og:site_name" content="Mario Rodríguez-Cantelar">
    <meta name="twitter:image:alt" content="My personal website">
    <!--  Required for Analytics -->
    <meta property="fb:app_id" content="203555734391977">
    <meta name="twitter:site" content="@Mario_RC">

    <title>Mario R-C</title><link rel="icon" href="assets/img/logo.png">
    <link rel="canonical" href="https://mario-rc.github.io/about">
</head>
<body>
    <header class="site-header site-header-about">
        <div class="wrapper">
            <div class="site-title"><a href="index.html">Mario Rodríguez-Cantelar</a></div>
            <nav class="site-navigation">
                <div class="menu">
                    <a href="index.html"><i class="fas fa-fw fa-home"></i>Home</a>
                    <a href="blog.html"><i class="fas fa-fw fa-search"></i>Blog</a>
                    <a href="focus.html"><i class="fas fa-stopwatch-20"></i>Focus</a>
                    <a href="about.html"><i class="fas fa-fw fa-user"></i>About</a>
                    <a href="#" onclick="toggleDark()"><i onclick="toggleIcon(this)" class="fas fa-fw fa-moon"></i></a>
                </div>
                <a class="btn-menu trigger-menu"><i class="fas fa-fw fa-bars"></i></a>
            </nav>
        </div>
    </header>
    <main class="site-main site-main-about">
        <div class="wrapper">
            <article class="site-layout site-layout-about">
                <section class="about-me">
                    <h4>About me</h4>
                    <p>Hello! Welcome to my website!.</p>
                </section>
                <section class="contact-me">
                    <h4>Contact</h4>
                    <p>Any questions or comments, feel free to contact me.</p>
                    <form action="" method="post">
                        <input name="full_name" type="text" class="contact-me-input" placeholder="Full name"/><br>
                        <input name="email" type="text" class="contact-me-input" placeholder="Email"/><br>
                        <textarea name="message" class="contact-me-input" placeholder="Comment"></textarea><br>
                        <input type="submit" name="submit" value="Send"/>
                    </form>
                </section>
            </article>
        </div>
    </main>
    <footer class="site-footer">
        <div class="wrapper">
            <div class="footer-col-1">
                <div class="footer-contact">
                    <div class="footer-contact__items">
                        <i class="fas fa-fw fa-user"></i>Mario Rodríguez-Cantelar</div>
                    <div class="footer-contact__items">
                        <a href="mailto:mario.rcantelar@upm.es"><i class="fas fa-fw fa-envelope"></i>mario.rcantelar@upm.es</a></div>
                </div>
            </div>
            <div class="footer-col-2">
                <div class="footer-social-media">
                    <div class="footer-social-media__items">
                        <a href="https://scholar.google.com/citations?user=gdGRy7gAAAAJ&amp;hl=en"><i class="fab fa-fw fa-google"></i>Google Scholar</a></div>
                    <div class="footer-social-media__items">
                        <a href="https://github.com/Mario-RC"><i class="fab fa-fw fa-github"></i>Mario-RC</a></div>
                </div>
            </div>
            <div class="footer-col-3">
                <div class="footer-location">
                    <i class="fas fa-fw fa-university"></i><a href="http://www.upm.es/internacional" class="institution">Universidad Politécnica de Madrid</a></div>
                <div class="footer-location">
                    <i class="fas fa-fw fa-map-marker-alt"></i><a href="https://en.wikipedia.org/wiki/Madrid">Madrid, Spain</a></div>
                </div>
            </div>
        </div>
    </footer>
    <section class="mobile-menu">
        <header class="mobile-menu__header">
            <span></span>
            <h2 class="site-title"><b>MENU</b></h2>
            <a href="#" class="trigger-menu"><i class="fas fa-fw fa-times"></i></a>
        </header>
        <nav class="mobile-menu__navigation">
            <a href="index.html"><i class="fas fa-fw fa-home"></i>Home</a>
            <a href="blog.html"><i class="fas fa-fw fa-search"></i>Blog</a>
            <a href="focus.html"><i class="fas fa-stopwatch-20"></i>Focus</a>
            <a href="about.html"><i class="fas fa-fw fa-user"></i>About</a>
            <a href="#" onclick="toggleDark()"><i onclick="toggleIcon(this)" class="fas fa-fw fa-moon"></i></a>
        </nav>
    </section>
    <script src="assets/js/app.js"></script>
</body>
</html>