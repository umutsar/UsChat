

class Person {

    #isim
    #soyisim
    #yas

    constructor(isim, soyisim, yas) {
        this.#isim = isim;
        this.#soyisim = soyisim;
        this.#yas = yas;
    }

    isimAl() {
        console.log(this.#isim);
    }

    soyisimAl() {
        console.log(this.#soyisim);
    }

    yasAl() {
        console.log(this.#yas);
    }
}

const umut = new Person("Umut", "Sar", 20);

umut.isimAl();
umut.soyisimAl();
umut.yasAl();