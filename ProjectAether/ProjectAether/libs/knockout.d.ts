// Type definitions for Knockout 2.2
// Project: http://knockoutjs.com
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare interface KnockoutSubscribableFunctions {
    extend(source);
    dispose(): void;
    peek(): any;
    valueHasMutated(): void;

    valueWillMutate(): void;
}

declare interface KnockoutComputedFunctions extends KnockoutSubscribableFunctions {
    getDependenciesCount(): number;
    hasWriteFunction(): bool;
}

declare interface KnockoutObservableFunctions extends KnockoutSubscribableFunctions {
}

declare interface KnockoutObservableArrayFunctions extends KnockoutObservableFunctions {
    // General Array functions
    indexOf(searchElement, fromIndex?: number): number;
    slice(start: number, end?: number): any[];
    splice(start: number): any[];
    splice(start: number, deleteCount: number, ...items: any[]): any[];
    pop();
    push(...items: any[]): void;
    shift();
    unshift(...items: any[]): number;
    reverse(): any[];
    sort(): void;
    sort(compareFunction): void;

    // Ko specific
    remove(item): any[];
    remove(func: (item: any) => bool): any[];
    removeAll(items: any[]): any[];
    removeAll(): any[];
    replace(oldItem: any, newItem: any): void;

    destroy(item): void;
    destroyAll(items: any[]): void;
    destroyAll(): void;


}

declare interface KnockoutSubscribableStatic {
    fn: KnockoutSubscribableFunctions;

    new (): KnockoutSubscription;
}

declare interface KnockoutSubscription extends KnockoutSubscribableFunctions {
    subscribe(callback: (newValue: any) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite, topic?: string);
}

declare interface KnockoutComputedStatic {
    fn: KnockoutComputedFunctions;

    (): KnockoutComputed;
    (func: () => any, context?: any): KnockoutComputed;
    (func: () => string, context?: any): KnockoutComputedString;
    (func: () => number, context?: any): KnockoutComputedNumber;
    (func: () => bool, context?: any): KnockoutComputedBool;
    (func: () => Date, context?: any): KnockoutComputedDate;
    (def: KnockoutComputedDefine): KnockoutComputed;
    (options?: any): KnockoutComputed;
}

declare interface KnockoutComputed extends KnockoutComputedFunctions {
    (): any;
    (value: any): void;

    subscribe(callback: (newValue: any) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite, topic?: string);
}


declare interface KnockoutComputedString extends KnockoutComputed {
    (): string;
    (value: string): void;

    subscribe(callback: (newValue: string) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: string, topic?: string);
}


declare interface KnockoutComputedNumber extends KnockoutComputed {
    (): number;
    (value: number): void;

    subscribe(callback: (newValue: number) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: number, topic?: string);
}

declare interface KnockoutComputedBool extends KnockoutComputed {
    (): bool;
    (value: bool): void;

    subscribe(callback: (newValue: bool) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: bool, topic?: string);
}

declare interface KnockoutComputedDate extends KnockoutComputed {
    (): Date;
    (value: Date): void;

    subscribe(callback: (newValue: Date) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: Date, topic?: string);
}

declare interface KnockoutObservableArrayStatic {

    fn: KnockoutObservableArrayFunctions;

    (): KnockoutObservableArray;
    (value: any[]): KnockoutObservableArray;
}

declare interface KnockoutObservableArray extends KnockoutObservableArrayFunctions {
    (): any[];
    (value: any[]): void;

    subscribe(callback: (newValue: any[]) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: any[], topic?: string);
}

declare interface KnockoutObservableStatic {
    fn: KnockoutObservableFunctions;

    (value: string): KnockoutObservableString;
    (value: Date): KnockoutObservableDate;
    (value: number): KnockoutObservableNumber;
    (value: bool): KnockoutObservableBool;
    (value?: any): KnockoutObservableAny;
}

declare interface KnockoutObservableBase extends KnockoutObservableFunctions {
}

declare interface KnockoutObservableAny extends KnockoutObservableBase {

    (): any;
    (value): void;

    subscribe(callback: (newValue: any) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite, topic?: string);
}

declare interface KnockoutObservableString extends KnockoutObservableBase {
    (): string;
    (value: string): void;

    subscribe(callback: (newValue: string) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: string, topic?: string);
}


declare interface KnockoutObservableNumber extends KnockoutObservableBase {
    (): number;
    (value: number): void;

    subscribe(callback: (newValue: number) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: number, topic?: string);
}

declare interface KnockoutObservableBool extends KnockoutObservableBase {
    (): bool;
    (value: bool): void;

    subscribe(callback: (newValue: bool) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: bool, topic?: string);
}

declare interface KnockoutObservableDate extends KnockoutObservableBase {
    (): Date;
    (value: Date): void;

    subscribe(callback: (newValue: Date) => void, target?:any, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite: Date, topic?: string);
}

declare interface KnockoutComputedDefine {
    read(): any;
    write(any);
}

declare interface KnockoutBindingContext {
    $parent: any;
    $parents: any[];
    $root: any;
    $data: any;
    $index?: number;
    $parentContext?: KnockoutBindingContext;

    extend(any): any;
    createChildContext(any): any;
}

declare interface KnockoutBindingHandler {
    init?(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void;
    update?(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void;
    options?: any;
}

declare interface KnockoutBindingHandlers {
    // Controlling text and appearance
    visible: KnockoutBindingHandler;
    text: KnockoutBindingHandler;
    html: KnockoutBindingHandler;
    css: KnockoutBindingHandler;
    style: KnockoutBindingHandler;
    attr: KnockoutBindingHandler;

    // Control Flow
    foreach: KnockoutBindingHandler;
    if: KnockoutBindingHandler;
    ifnot: KnockoutBindingHandler;
    with: KnockoutBindingHandler;

    // Working with form fields
    click: KnockoutBindingHandler;
    event: KnockoutBindingHandler;
    submit: KnockoutBindingHandler;
    enable: KnockoutBindingHandler;
    disable: KnockoutBindingHandler;
    value: KnockoutBindingHandler;
    hasfocus: KnockoutBindingHandler;
    checked: KnockoutBindingHandler;
    options: KnockoutBindingHandler;
    selectedOptions: KnockoutBindingHandler;
    uniqueName: KnockoutBindingHandler;

    // Rendering templates
    template: KnockoutBindingHandler;
}

declare interface KnockoutMemoization {
    memoize(callback);
    unmemoize(memoId, callbackParams);
    unmemoizeDomNodeAndDescendants(domNode, extraCallbackParamsArray);
    parseMemoText(memoText);
}

declare interface KnockoutVirtualElements {
    allowedBindings;
    emptyNode;
    firstChild;
    insertAfter;
    nextSibling;
    prepend;
    setDomNodeChildren;
}

declare interface KnockoutExtenders {
    throttle(target: any, timeout: number): KnockoutComputed;
    notify(target: any, notifyWhen: string): any;
}

declare interface KnockoutUtils {

    fieldsIncludedWithJsonPost: any[];

    arrayForEach(array: any[], action: (any) => void ): void;
    arrayIndexOf(array: any[], item: any): number;
    arrayFirst(array: any[], predicate: (item) => bool, predicateOwner?: any): any;
    arrayRemoveItem(array: any[], itemToRemove: any): void;
    arrayGetDistinctValues(array: any[]): any[];
    arrayMap(array: any[], mapping: (item) => any): any[];
    arrayFilter(array: any[], predicate: (item) => bool): any[];
    arrayPushAll(array: any[], valuesToPush: any[]): any[];

    extend(target, source);

    emptyDomNode(domNode): void;
    moveCleanedNodesToContainerElement(nodes: any[]): HTMLElement;
    cloneNodes(nodesArray: any[], shouldCleanNodes: bool): any[];
    setDomNodeChildren(domNode: any, childNodes: any[]): void;
    replaceDomNodes(nodeToReplaceOrNodeArray: any, newNodesArray: any[]): void;
    setOptionNodeSelectionState(optionNode: any, isSelected: bool): void;
    stringTrim(str: string): string;
    stringTokenize(str: string, delimiter: string): string;
    stringStartsWith(str: string, startsWith: string): string;
    domNodeIsContainedBy(node: any, containedByNode: any): bool;
    domNodeIsAttachedToDocument(node: any): bool;
    tagNameLower(element: any): string;
    registerEventHandler(element: any, eventType: any, handler: Function): void;
    triggerEvent(element: any, eventType: any): void;
    unwrapObservable(value: any): any;
    toggleDomNodeCssClass(node: any, className: string, shouldHaveClass: bool): void;
    setTextContent(element: any, textContent: string): void;
    setElementName(element: any, name: string): void;
    ensureSelectElementIsRenderedCorrectly(selectElement);
    forceRefresh(node: any): void;
    ensureSelectElementIsRenderedCorrectly(selectElement: any): void;
    range(min: any, max: any): any;
    makeArray(arrayLikeObject: any): any[];
    getFormFields(form: any, fieldName: string): any[];
    parseJson(jsonString: string): any;
    stringifyJson(data: any, replacer: Function, space: string): string;
    postJson(urlOrForm: any, data: any, options: any): void;

    domNodeDisposal;
}


interface KnockoutStatic {
    utils: KnockoutUtils;
    memoization: KnockoutMemoization;
    bindingHandlers: KnockoutBindingHandlers;
    virtualElements: KnockoutVirtualElements;
    extenders: KnockoutExtenders;

    applyBindings(viewModel: any, rootNode?: any): void;
    applyBindingsToDescendants(viewModel: any, rootNode: any): void;

    subscribable: KnockoutSubscribableStatic;
    observable: KnockoutObservableStatic;
    computed: KnockoutComputedStatic;
    observableArray: KnockoutObservableArrayStatic;

    contextFor(node: any): any;
    isSubscribable(instance: any): bool;
    toJSON(viewModel: any, replacer?: Function, space?: any): string;
    toJS(viewModel: any): any;
    isObservable(instance: any): bool;
    dataFor(node: any): any;
    removeNode(node: Element);
}
declare var ko: KnockoutStatic;