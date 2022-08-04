function normalizer(array){
    return array.map(product => product.buy_box_winner || product);
}

module.exports = normalizer;