# bloomjs
A simple bloom filter implemented in javascript.

Bloom filters are a space efficient way of representing a set.
They never give false negatives, but do give false positives.

For instance, given a bloom filter b, we can say with certainty that if an element q has been added to b, then b(q) will be true. However, we cannot say that for any element r that has not been added to b, b(r) is false.
By picking appropriate constants, we can make the probability of a false positive arbitrarily low, at the cost of decreased performance.

# Usage

Create a new bloom filter

    // The first argument specifies the size of the set
    // The second argument specifies the desired false positive probability
    var filter = new Bloom(1000, 0.01);

Add a new element to the filter

    filter.add("I'm in the set!");

Check if the filter contains an element

    filter.contains("I'm in the set!"); // true
    filter.contains(""); // (probably) false
