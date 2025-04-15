window.onload = function()
{
    const cursor_bg = document.getElementById("cursor_bg");
    // const ds_ico = document.getElementById("ds_ico");
    const mail_ico = document.getElementById("mail_ico");
    var content = document.getElementById("content");

    content.style.borderColor = 'rgba(139, 104, 107, 0.48)';

    var angle = getComputedStyle(content).getPropertyValue("--angle");

    onresize = (event) => {
        content = document.getElementById("content");
    };

    document.body.onpointermove = event =>
    {
        const { clientX, clientY } = event;

        cursor_bg.animate(
            {
                left: `${clientX}px`,
                top: `${clientY}px`
            },
            {
                duration: 100,
                fill: "forwards"
            }
        )

        const content_rect = content.getBoundingClientRect();
        const content_w = content_rect.width;
        const content_h = content_rect.height;
        const content_x = content_rect.left+(content_w/2);
        const content_y = content_rect.top+(content_h/2);
        const aspect_ratio = content_w/content_h;

        const x_dist = (clientX-content_x);
        const y_dist = (clientY-content_y)*aspect_ratio; // this avoids getting more oppacity in the X axis than in the Y

        const hip_size = Math.sqrt(x_dist*x_dist+y_dist*y_dist);

        var alpha = ((hip_size*100)/(content_y/2)-100); // gets the percentage of distance to get the desired opacity

        if (x_dist >= content_w/2 || x_dist <= (content_w/2)*-1 ||
            y_dist >= content_h/2 || y_dist <= (content_h/2)*-1)
            content.style.borderColor = 'rgba(139, 104, 107, 0.48)';
        else if (alpha >= 120 && alpha <= 240)
        content.animate(
            { borderColor: 'rgba(139, 104, 107, '+ alpha/400 +')' },
            { duration: 5, fill: "forwards" }
        )

        // console.log(alpha.toString());
    }

    /*
        // Uh oh, this was meant to be deleted, but since you're here,
        // as reward I give you my Discord contact.
        // (which is inside the funcion)
        
        ds_ico.onclick = copy;
        function copy() { navigator.clipboard.writeText('usr.mariejeanne'); }
    */

    mail_ico.onclick = redirect;
    function redirect() { window.location.href = "mailto:mail.maryjamesb@gmail.com"; }
}
