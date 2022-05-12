(function() {
    document.querySelectorAll('.formulaType input').addEventListener('click', (e) => {
        let target = e.target;
        let parent = target.parentNode;

        document.querySelectorAll('.formulaType').forEach((el) => {
            el.classList.remove('active');
        });

        parent.classList.add('active');

    });
})();