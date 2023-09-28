function n_dimensions_foreach(dimensions, dimensions_length) {
    const stack = [];
    const final_stack = [];
    for (let i = 0; i < dimensions[0]; i++) {
        stack.push({[0]: dimensions[0]});
    }

    while(stack.length) {
        const entry = stack.pop();
        // console.log({entry});
        const [level, size] = [...Object.entries(entry)][0].map(Number);
        // console.log({entry, level, size});
        final_stack.push(entry);
        if (level === dimensions_length - 1) {
            continue;
        }
        const nextLevel = level + 1;
        const nextLeveleSize = dimensions[nextLevel];
        for (let i = 0; i < nextLeveleSize; i++) {
            stack.push({[nextLevel]: dimensions[nextLevel] })
        }
    }

    while(final_stack.length) {
        const entry = final_stack.shift();
        const [level, size] = [...Object.entries(entry)][0].map(Number);
        console.log({entry, level, size});
        // console.log(entry);
    }

    // console.log(final_stack);

}

n_dimensions_foreach([2,3,4], 3);