
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

<div class="navigation-footer">
    <button onclick="goBack()" class="nav-btn">
        <i class="fas fa-arrow-left"></i> 
    </button>
    <button onclick="goHome()" class="nav-btn">
        <i class="fas fa-home"></i> 
    </button>
</div>

<script>
    function goBack() {
        window.history.back(); 
    }

    function goHome() {
        window.location.href = 'home.php'; 
    }
</script>

<style>
    .navigation-footer {
        position: fixed; 
        bottom: 20px; 
        left: 20px; 
        z-index: 9999; 
        display: flex; 
        gap: 10px; 
        background-color: rgba(0, 0, 0, 0.7); 
        padding: 10px;
        border-radius: 10px;
    }

    .nav-btn {
        background-color: #fff;
        color: #53442f;
        border: 2px solid #53442f;
        border-radius: 50%; 
        padding: 10px;
        width: 50px;
        height: 50px;
        font-size: 20px; 
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .nav-btn:hover {
        background-color: #53442f;
        color: #fff;
        transform: scale(1.1);
    }

    .nav-btn i {
        font-size: 20px; 
    }
</style>
