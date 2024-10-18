module.exports = function (t) {
    return {
        ObjectExpression(path) {
            const props = path.node.properties
            const pathProp = props.find(
                (p) =>
                    t.isObjectProperty(p) &&
                    t.isIdentifier(p.key, { name: 'path' }) &&
                    t.isStringLiteral(p.value) &&
                    p.value.value.includes('/template/http')
            )

            if (pathProp) {
                path.remove()
            }
        },
    }
}
