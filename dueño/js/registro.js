document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('.select');
    
    selects.forEach(select => {
        const menu = select.nextElementSibling;
        const items = menu.querySelectorAll('li');
        const icon = select.querySelector('.fa');

        select.addEventListener('click', function() {
            menu.classList.toggle('open');
            select.classList.toggle('open');
        });

        items.forEach(item => {
            item.addEventListener('mouseover', function() {
                select.querySelector('.choosed').textContent = this.textContent;
                items.forEach(i => i.classList.remove('active')); // Remove 'active' class from all items
                this.classList.add('active'); // Add 'active' class to the hovered item
            });

            item.addEventListener('click', function() {
                select.querySelector('.choosed').textContent = this.textContent;
                menu.classList.remove('open');
                select.classList.remove('open');
                items.forEach(i => i.classList.remove('active')); // Remove 'active' class from all items
            });
        });

        document.addEventListener('click', function(event) {
            if (!select.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.remove('open');
                select.classList.remove('open');
            }
        });
    });
});
