"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const types_1 = require("../types");
const typeMaps = {
    "string": "string",
    "number": "float",
    "boolean": "bool",
    "int8": "sbyte",
    "uint8": "byte",
    "int16": "short",
    "uint16": "ushort",
    "int32": "int",
    "uint32": "uint",
    "int64": "long",
    "uint64": "ulong",
    "float32": "float",
    "float64": "double",
};
/**
 * C# Code Generator
 */
const capitalize = (s) => {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
function generate(context, options) {
    // enrich typeMaps with enums
    context.enums.forEach((structure) => {
        typeMaps[structure.name] = structure.name;
    });
    return [
        ...context.classes.map(structure => ({
            name: `${structure.name}.cs`,
            content: generateClass(structure, options.namespace)
        })),
        ...context.interfaces.map(structure => ({
            name: `${structure.name}.cs`,
            content: generateInterface(structure, options.namespace),
        })),
        ...context.enums.filter(structure => structure.name !== 'OPERATION').map((structure) => ({
            name: `${structure.name}.cs`,
            content: generateEnum(structure, options.namespace),
        })),
    ];
}
function generateClass(klass, namespace) {
    const indent = (namespace) ? "\t" : "";
    return `${(0, types_1.getCommentHeader)()}

using Colyseus.Schema;
#if UNITY_5_3_OR_NEWER
using UnityEngine.Scripting;
#endif
${namespace ? `\nnamespace ${namespace} {` : ""}
${indent}public partial class ${klass.name} : ${klass.extends} {
#if UNITY_5_3_OR_NEWER
[Preserve]
#endif
public ${klass.name}() { }
${klass.properties.map((prop) => generateProperty(prop, indent)).join("\n\n")}
${indent}}
${namespace ? "}" : ""}
`;
}
function generateEnum(_enum, namespace) {
    const indent = namespace ? "\t" : "";
    return `${(0, types_1.getCommentHeader)()}
${namespace ? `\nnamespace ${namespace} {` : ""}
${indent}public struct ${_enum.name} {

${_enum.properties
        .map((prop) => {
        let dataType = "int";
        let value;
        if (prop.type) {
            if (isNaN(Number(prop.type))) {
                value = `"${prop.type}"`;
                dataType = "string";
            }
            else {
                value = Number(prop.type);
                dataType = Number.isInteger(value) ? 'int' : 'float';
            }
        }
        else {
            value = _enum.properties.indexOf(prop);
        }
        return `${indent}\tpublic const ${dataType} ${prop.name} = ${value};`;
    })
        .join("\n")}
${indent}}
${namespace ? "}" : ""}`;
}
function generateProperty(prop, indent = "") {
    let typeArgs = `"${prop.type}"`;
    let property = "public";
    let langType;
    let initializer = "";
    if (prop.childType) {
        const isUpcaseFirst = prop.childType.match(/^[A-Z]/);
        langType = getType(prop);
        typeArgs += `, typeof(${langType})`;
        if (!isUpcaseFirst) {
            typeArgs += `, "${prop.childType}"`;
        }
        initializer = `null`;
    }
    else {
        langType = getType(prop);
        initializer = `default(${langType})`;
    }
    property += ` ${langType} ${prop.name}`;
    let ret = (prop.deprecated) ? `\t\t[System.Obsolete("field '${prop.name}' is deprecated.", true)]\n` : '';
    return ret + `\t${indent}[Type(${prop.index}, ${typeArgs})]
\t${indent}${property} = ${initializer};`;
}
function generateInterface(struct, namespace) {
    const indent = (namespace) ? "\t" : "";
    return `${(0, types_1.getCommentHeader)()}

using Colyseus.Schema;
${namespace ? `\nnamespace ${namespace} {` : ""}
${indent}public class ${struct.name} {
${struct.properties.map(prop => `\t${indent}public ${getType(prop)} ${prop.name};`).join("\n")}
${indent}}
${namespace ? "}" : ""}
`;
}
function getChildType(prop) {
    return typeMaps[prop.childType];
}
function getType(prop) {
    if (prop.childType) {
        const isUpcaseFirst = prop.childType.match(/^[A-Z]/);
        let type;
        if (prop.type === "ref") {
            type = (isUpcaseFirst)
                ? prop.childType
                : getChildType(prop);
        }
        else {
            const containerClass = capitalize(prop.type);
            type = (isUpcaseFirst)
                ? `${containerClass}Schema<${prop.childType}>`
                : `${containerClass}Schema<${getChildType(prop)}>`;
        }
        return type;
    }
    else {
        return (prop.type === "array")
            ? `${typeMaps[prop.childType] || prop.childType}[]`
            : typeMaps[prop.type];
    }
}
//# sourceMappingURL=csharp.js.map