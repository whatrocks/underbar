(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    // First, check if collection is an Array
    if (collection instanceof Array) {
      // Iterate through all the items in the array
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      // Now iterate thru a non-array object
      for (var thing in collection) {
        iterator(collection[thing], thing, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {

    // Create a new empty array to hold elements that pass the test
    var result = [];

    // Iterate thru collection with _.each
    _.each(collection, function(thing) {
      // If the test returns true for that item, push that item to the results array
      if (test(thing)) {
        result.push(thing);
      }
    });

    return result;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    return _.filter(collection, function(value) {
      // If the item fails the test, then you should return it to the filter function
      // so that the filter function can create an array of the failed items
      return !test(value);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    
    /* Charlie original solution
    var result = [];

    // Iterate with each
    _.each(array, function(item) {
      // Use indexOf to check if already pushed to result
      // If not in result yet, then push to result
      if (_.indexOf(result, item) === -1) {
        result.push(item);
      }
    });

    return result;
    */

    // HR preferred solution: Breadcrumbing

    var result = [];
    var unique = {};

    for (var i = 0; i < array.length; i++) {
      unique[array[i]] = array[i];
    }

    for (var key in unique) {
      result.push(unique[key]);
    }

    return result;


  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var result = [];

    _.each(collection, function(value, key, collection) {
      result.push(iterator(value, key, collection));
    });

    return result;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {


    /* Charlie original solution
    var current;

    // Set the current variable based on whether or not the 'accumlator'
    // parameter is provided
    if (accumulator !== undefined) {
      current = accumulator;
    // When not provided, sse the first element in the collection as the accumulator,
    // and then remove it from the collection
    } else {
      current = collection[0];
      collection.shift();
    }

    // Use each to go thru each item, and "combine" with the iterator function
    _.each(collection, function(item) {
      current = iterator(current, item);
    });

    // Return the end result in current
    return current; */


    // HR Solution

    var initializing = arguments.length === 2;

    _.each(collection, function(value) {

      if (initializing) {
        accumulator = value;
        initializing = false;
      } else {
        accumulator = iterator(accumulator, value);
      }

    });

    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.



    /* Charlie original solution
    // Use the underbar.js _.identity function when there is 
    // no iterator passed to _.every
    if (!iterator) {
      iterator = _.identity;
    }

    // Create a variable "result" to store the result
    // of reducing the collection by checking for 
    // the truthiness of the items
    var result = _.reduce(collection, function(a, b) {
      
      // Checking here for null values, since null
      // evaluates to "object" below
      if (b === null) {
        b = 0;
      }

      // Not sure if this is an ideal way to do this
      // but this solves an issue with concatenation.
      // Specifically, empty arrays or object literals were not
      // evaluating to "1", so the reduction wasn't working.
      if (typeof b === "object") {
        b = 1;
      }

      // Another concatenation quick-fix for "truthy" strings
      if (typeof b === "string") {
        if (b.length > 0) {
          b = 1;
        }
      }

      return a + iterator(b);
    
    // Start with a value of 1 so that empty collections
    // will evaluate to true
    }, 1);

    // If all the items in the collection match the truth test,
    // then the result variable should be greater than the 
    // number of items in the collection
    if (result > collection.length) {
      return true;
    } else {
      return false;
    }
    */

    // HR Solution
    iterator = iterator || _.identity;

    return !!_.reduce(collection, function(trueSoFar, value) {
      return trueSoFar && iterator(value);
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    /* charlie old solution
    var result = 0;

    _.each(collection, function(item) {

      var tempArr = [];
      tempArr.push(item);
      result += _.every(tempArr, iterator);

    });

    if (result > 0) {
      return true;
    } else {
      return false;
    } */

    // HR Solution
    iterator = iterator || _.identity;

    return !!_.reduce(collection, function(trueSoFar, value) {
      return trueSoFar || iterator(value);
    }, false);

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {


    /* Charlie's Solution
    // Iterate through the arguments object
    // starting with the second element
    for (var i = 1; i < arguments.length; i++) {

      // Iterate through any and all properties
      // in each of the arguments
      for (var thing in arguments[i]) {

        // Add or replace that property in the
        // original object
        obj[thing] = arguments[i][thing];

      }

    }

    // Return the object
    return obj;
    */

    // HR Solution
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    // Charlie solution
    /*
    for (var i = 0; i < arguments.length; i++) {
      for (var thing in arguments[i]) {
        // Same as extend, but need to first check if the key
        // is already in obj, and if it is, skip to next iteration
        if (thing in obj) {
          continue;
        }
        obj[thing] = arguments[i][thing];
      }
    }

    return obj;
    */

    //HR solution
    _.each(arguments, function(source) {
      _.each(source, function(value, key) {
        obj[key] === undefined && (obj[key] = value);
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {


    // HR solution
    var results = {};

    return function() {

      var arg = JSON.stringify(arguments);

      if ( !results[arg] ) {
        results[arg] = func.apply(this, arguments);
      }

      return results[arg]; 

    };

    /* Charlie solution
    var result;
    // Object to store the computed results
    var alreadyComputed = {};

    return function() {

      // Creates simple array from the arguments object
      var args = Array.prototype.slice.call(arguments, 0);

      if (!(args in alreadyComputed)) {
        result = func.apply(this, args);
        // Add the computed result to "alreadyComputed" object
        alreadyComputed[args] = result;
      } else {
        result = alreadyComputed[args];
      }

      return result;
    }; */


  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var numbOfPassedParameters = arguments.length - 2;
    var passedParams = [];

    // Create an array of parameters to pass to "func"
    for (var i = 0; i < numbOfPassedParameters; i++) {
      var param = arguments[arguments.length - 1 - i];
      passedParams.unshift(param);
    }

    // This will execute the function
    return setTimeout(function() {
      return func.apply(this, passedParams);
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var copyArray = array.slice();
    var arrayLength = copyArray.length;
    var results = [];

    for (var i = 0; i < arrayLength; i++) {
      var randomIndex = Math.floor(Math.random() * copyArray.length);
      var randomItem = copyArray[randomIndex];
      results.push(randomItem);
      copyArray.splice(randomIndex, 1);
    }

    return results;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, function(item) {
      var method = typeof functionOrKey === "string" ? item[functionOrKey] : functionOrKey;
      return method.apply(item, args);
    });

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {

    var result = [];

    var arraze = Array.prototype.slice.call(arguments, 0);

    var zipper = function() {

    };

    zipper(arraze);

    return result;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    return _.reduce(nestedArray, function(a, b) {

      if (b instanceof Array) {
        return a.concat(_.flatten(b));
      } else {
        return a.concat(b);
      }

    }, []);

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
