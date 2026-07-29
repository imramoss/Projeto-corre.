.hidden{
    opacity:0;
    transform:translateY(60px);
    transition:.8s;
}

.show{
    opacity:1;
    transform:translateY(0);
}

.menu.active{
    display:flex;
    position:absolute;
    top:90px;
    left:0;
    width:100%;
    background:#111;
    flex-direction:column;
    padding:30px;
}

.back-top{
    position:fixed;
    right:30px;
    bottom:30px;
    width:55px;
    height:55px;
    border:none;
    border-radius:50%;
    background:#A3FF12;
    color:#000;
    font-size:24px;
    cursor:pointer;
    opacity:0;
    transform:translateY(20px);
    transition:.3s;
    z-index:999;
}

.back-top.visible{
    opacity:1;
    transform:translateY(0);
}

.hamburger{
    display:none;
    flex-direction:column;
    gap:5px;
    cursor:pointer;
}

.hamburger span{
    width:28px;
    height:3px;
    background:#fff;
    border-radius:10px;
}

@media(max-width:1100px){
    .hamburger{
        display:flex;
    }
}
