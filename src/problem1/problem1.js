var sum_to_n_a = function(n) {
    sum = 0;
    for(i =  1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    return n * (n + 1) / 2;
};

var sum_to_n_c = function(n) {
    function helper(x) {
        if(x == 0) {
            return 0;
        }
        return x + helper(x-1);
    }
    return helper(n);
};