// Gale - Shapley algorithm of stable matching problem(SMP)

/* https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0_%D1%81%D1%82%D0%B0%D0%B1%D1%96%D0%BB%D1%8C%D0%BD%D0%B8%D1%85_%D1%88%D0%BB%D1%8E%D0%B1%D1%96%D0%B2
    val boyPrefers:(
      "abe" -> Array("abi", "eve", "cath", "ivy", "jan", "dee", "fay", "bea", "hope", "gay"),
      "bob" -> Array("cath", "hope", "abi", "dee", "eve", "fay", "bea", "jan", "ivy", "gay"),
      "col" -> Array("hope", "eve", "abi", "dee", "bea", "fay", "ivy", "gay", "cath", "jan"),
      "dan" -> Array("ivy", "fay", "dee", "gay", "hope", "eve", "jan", "bea", "cath", "abi"),
      "ed" -> Array("jan", "dee", "bea", "cath", "fay", "eve", "abi", "ivy", "hope", "gay"),
      "fred" -> Array("bea", "abi", "dee", "gay", "eve", "ivy", "cath", "jan", "hope", "fay"),
      "gav" -> Array("gay", "eve", "ivy", "bea", "cath", "abi", "dee", "hope", "jan", "fay"),
      "hal" -> Array("abi", "eve", "hope", "fay", "ivy", "cath", "jan", "bea", "gay", "dee"),
      "ian" -> Array("hope", "cath", "dee", "gay", "bea", "abi", "fay", "ivy", "jan", "eve"),
      "jon" -> Array("abi", "fay", "jan", "gay", "eve", "bea", "dee", "cath", "ivy", "hope")
    )
    val girlPrefers:(
      "abi" -> Array("bob", "fred", "jon", "gav", "ian", "abe", "dan", "ed", "col", "hal"),
      "bea" -> Array("bob", "abe", "col", "fred", "gav", "dan", "ian", "ed", "jon", "hal"),
      "cath" -> Array("fred", "bob", "ed", "gav", "hal", "col", "ian", "abe", "dan", "jon"),
      "dee" -> Array("fred", "jon", "col", "abe", "ian", "hal", "gav", "dan", "bob", "ed"),
      "eve" -> Array("jon", "hal", "fred", "dan", "abe", "gav", "col", "ed", "ian", "bob"),
      "fay" -> Array("bob", "abe", "ed", "ian", "jon", "dan", "fred", "gav", "col", "hal"),
      "gay" -> Array("jon", "gav", "hal", "fred", "bob", "abe", "col", "ed", "dan", "ian"),
      "hope" -> Array("gav", "jon", "bob", "abe", "ian", "dan", "hal", "ed", "col", "fred"),
      "ivy" -> Array("ian", "col", "hal", "gav", "fred", "bob", "abe", "ed", "jon", "dan"),
      "jan" -> Array("ed", "hal", "gav", "abe", "bob", "jon", "col", "ian", "fred", "dan")
    ) */

const men = {
    abe: ["abi", "eve", "cath", "ivy", "jan", "dee", "fay", "bea", "hope", "gay"],
    bob: ["cath", "hope", "abi", "dee", "eve", "fay", "bea", "jan", "ivy", "gay"],
    col: ["hope", "eve", "abi", "dee", "bea", "fay", "ivy", "gay", "cath", "jan"],
    dan: ["ivy", "fay", "dee", "gay", "hope", "eve", "jan", "bea", "cath", "abi"],
    ed: ["jan", "dee", "bea", "cath", "fay", "eve", "abi", "ivy", "hope", "gay"],
    fred: ["bea", "abi", "dee", "gay", "eve", "ivy", "cath", "jan", "hope", "fay"],
    gav: ["gay", "eve", "ivy", "bea", "cath", "abi", "dee", "hope", "jan", "fay"],
    hal: ["abi", "eve", "hope", "fay", "ivy", "cath", "jan", "bea", "gay", "dee"],
    ian: ["hope", "cath", "dee", "gay", "bea", "abi", "fay", "ivy", "jan", "eve"],
    jon: ["abi", "fay", "jan", "gay", "eve", "bea", "dee", "cath", "ivy", "hope"]
};

const women = {
    abi: ["bob", "fred", "jon", "gav", "ian", "abe", "dan", "ed", "col", "hal"],
    bea: ["bob", "abe", "col", "fred", "gav", "dan", "ian", "ed", "jon", "hal"],
    cath: ["fred", "bob", "ed", "gav", "hal", "col", "ian", "abe", "dan", "jon"],
    dee: ["fred", "jon", "col", "abe", "ian", "hal", "gav", "dan", "bob", "ed"],
    eve: ["jon", "hal", "fred", "dan", "abe", "gav", "col", "ed", "ian", "bob"],
    fay: ["bob", "abe", "ed", "ian", "jon", "dan", "fred", "gav", "col", "hal"],
    gay: ["jon", "gav", "hal", "fred", "bob", "abe", "col", "ed", "dan", "ian"],
    hope: ["gav", "jon", "bob", "abe", "ian", "dan", "hal", "ed", "col", "fred"],
    ivy: ["ian", "col", "hal", "gav", "fred", "bob", "abe", "ed", "jon", "dan"],
    jan: ["ed", "hal", "gav", "abe", "bob", "jon", "col", "ian", "fred", "dan"]
};


const coup = {};
const index = {};

for (let man in men) {
    index[man] = 0;
}


while (Object.keys(men).length > Object.keys(coup).length) {
    let proposition = {};
    for (let woman in coup) {                 //Вносим уже существующие пары
        proposition[woman] = [coup[woman]];
    };


    (function manOffer() {
        for (let man in men) {
            if (Object.values(coup).indexOf(man) === -1) {  // Проверяем свободен ли парень
                let desire = men[man][index[man]];      // Парень виберает девушку по своему списку

                if (proposition[desire]) {              // Девушке добавляем претендента
                    proposition[desire].push(man);
                } else {
                    proposition[desire] = [man];
                }

                index[man] += 1;        // Переносим на следующу в списке девушку в случаи неудачи
            }
        }
    })();


    (function agrement() {
        for (let woman in proposition) {   // Девушка вибирает парня 

            if (proposition[woman].length === 1) {
                coup[woman] = proposition[woman][0];  // Если претендент один то девушка будет с ним
            } else {
                let winer = proposition[woman].reduce((i, e) => {
                    if (women[woman].indexOf(e) < i) {
                        return women[woman].indexOf(e);
                    } else {
                        return i;
                    }
                }, women[woman].length);

                coup[woman] = women[woman][winer];    // Создаем пару с победителем из претендентов
            }
        }
    })();

};

console.log('Solving Marriage Problem:');
console.log(coup);


