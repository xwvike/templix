module.exports = function (t) {
    return {
        ObjectExpression(path) {
            const props = path.node.properties
            const pathProp = props.find(
                (p) =>
                    t.isObjectProperty(p) &&
                    t.isIdentifier(p.key, { name: 'name' }) &&
                    t.isStringLiteral(p.value) &&
                    p.value.value.includes('crud')
            )

            if (pathProp) {
                path.remove()
            }
        },
    }
}
