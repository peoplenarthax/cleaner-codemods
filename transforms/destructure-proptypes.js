class SpecifierBuilder {
    constructor(name) {
        this._name = name;
    }
    build() {
        return {
            type: 'ImportSpecifier',
            local: {
                type: 'Identifier',
                name: this._name,
            },
            imported: {
                type: 'Identifier',
                name: this._name,
            }
        }
    }
}

export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
    let typesSet = new Set();
    // Move the assign from PropType to type
    const propTypesAssign = root
        .find(j.MemberExpression)
        .filter(isReactPropTypes)
        .forEach(path => {
            if (path.node.object.object) {
                path.node.object = path.node.object.property;
                typesSet.add(path.node.object.name);
                console.log('add', typesSet)
            } else {
                path.node.type = 'Identifier';
                path.node.name = path.node.property.name;
                typesSet.add(path.node.name)
            }
        });
    // Destructure the import
    const propTypesImport = root
        .find(j.ImportDeclaration, {
            source: {
                value: 'prop-types'
            }
        })
        .forEach(path => {
            const types = Array.from(typesSet);
            path.node.specifiers[0] = new SpecifierBuilder(types[0]).build();
            for (let i = 1; i < types.length; i++) {
                if (types[i] === 'undefined') {
                    continue;
                }
                const newSpecifier = new SpecifierBuilder(types[i]).build();
                path.node.specifiers = [...path.node.specifiers, newSpecifier]
            }


        });

    return root.toSource();
};

// Check both cases PropTypes.something and PropTypes.something.isRequired
function isReactPropTypes(path) {
    return (
        (path.node.object.type === 'MemberExpression' &&
        path.node.object.object &&
        path.node.object.object.name === 'PropTypes') || (
        path.node.object.name === 'PropTypes' && !path.node.object.object)
    );
}