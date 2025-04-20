// JavaScript for Jastip Gacoan user panel

document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    const orderMessage = document.getElementById('orderMessage');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const item = orderForm.item.value.trim();
            const quantity = orderForm.quantity.value;
            const address = orderForm.address.value.trim();

            if (!item || !quantity || !address) {
                orderMessage.style.color = 'red';
                orderMessage.textContent = 'Mohon isi semua bidang dengan benar.';
                return;
            }

            // Placeholder for sending order data to backend or database
            // For now, just show a success message

            orderMessage.style.color = 'green';
            orderMessage.textContent = `Pesanan untuk "${item}" sebanyak ${quantity} telah diterima. Alamat pengiriman: ${address}`;

            // Reset form
            orderForm.reset();
        });
    }
});


