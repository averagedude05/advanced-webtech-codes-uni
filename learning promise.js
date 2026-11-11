function processOrder() {
    return new Promise((resolve, reject) => {
        console.log("processing the order..");
        setTimeout(() => {
            const success = true;

            if (success) {
                resolve({
                    id: 42017,
                    name: "Adib",
                    item: "chicken burger",
                    quantity: 2,
                    total : 500
                });
            } else {
                reject("failed");
            }
        }, 3000);
    });
}


processOrder()
    .then((menu) => {
        console.log("student data received");
        console.log("Id", menu.id);
        console.log("name :", menu.name);
        console.log("item :", menu.item);
        console.log("quantity:", menu.quantity);
        console.log("total :", menu.total);
    })
    .catch((error) => {
        console.log("error", error);
    })
    .finally(() => {
        console.log("Processing is done");
    });