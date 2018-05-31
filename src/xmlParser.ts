import { MaxXmlDepthError } from './errors';
import { MAX_XML_DEPTH, platform } from './utils';

// tslint:disable:variable-name

//
// platform specific modules
//

let xmlServices: any;
if (platform.isNode) {
    xmlServices = require("xmldom");
} else {
    xmlServices = window;
}
const DomParserType: typeof DOMParser = xmlServices.DOMParser;
const XmlSerializerType: typeof XMLSerializer = xmlServices.XMLSerializer;

//
// parser class
//

export class XmlParser {

    private static readonly parser = new DomParserType();
    private static readonly serializer = new XmlSerializerType();

    public parse(str: string): Document {
        return XmlParser.parser.parseFromString(str, "text/xml");
    }

    public serialize(xmlNode: Node): string {
        return XmlParser.serializer.serializeToString(xmlNode);
    }

    public textContent(node: Node): string {
        return this.textContentRecurse(node, 0);
    }
    
    //
    // private methods
    //

    private textContentRecurse(node: Node, depth: number): string {
        if (depth > MAX_XML_DEPTH)
            throw new MaxXmlDepthError(depth);

        if (!node)
            return '';

        if (node.nodeType === node.TEXT_NODE)
            return node.textContent;

        // process child nodes
        const childrenText: string[] = [];
        const childNodesLength = (node.childNodes ? node.childNodes.length : 0);
        for (let i = 0; i < childNodesLength; i++) {
            const child = node.childNodes.item(i);
            const childText = this.textContentRecurse(child, depth + 1);
            childrenText.push(childText);
        }

        return childrenText.join('');
    }
}