import { NodeTypes } from "./ast";

export function baseParse(content: string) {
    const context = createParserContext(content)
    return createRoot(paserChildren(context))
};

function paserChildren(context) {
    const nodes: any = []
    let node;

    if(context.source.startsWith("{{")){
        node = paserInterpolation(context)
    }
    nodes.push(node);
    return nodes
}

function paserInterpolation(context) {

    const openDelimiter = "{{"
    const closeDelimiter = "}}"

    const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)
    
    advanceBy(context, openDelimiter.length)

    const rawContentLength = closeIndex - openDelimiter.length;

    const rawContent = context.source.slice(0, rawContentLength);

    const content = rawContent.trim()

    advanceBy(context, rawContentLength + closeDelimiter.length)

    console.log(rawContent);
    console.log("context.source", context.source);
    console.log(closeIndex);
    return {
            type: NodeTypes.INTERPOLATION,
            content: {
                type: NodeTypes.SIMPLE_EXPRESSION,
                content: content ,
            },
        }
}

function createRoot(children) {
    return {
        children
    }
}
    
function createParserContext(content: string):any {
    return {
        source: content
    }
}

function advanceBy(context: any, length: number) {
    context.source = context.source.slice(length)
}
