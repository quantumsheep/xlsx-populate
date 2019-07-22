"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RELATIONSHIP_SCHEMA_PREFIX = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/';
/**
 * A relationship collection.
 * @ignore
 */
class Relationships {
    /**
     * Creates a new instance of _Relationships.
     * @param node - The node.
     */
    constructor(node) {
        this._node = node || {
            name: 'Relationships',
            attributes: {
                xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
            },
        };
        this._nextId = 1;
        if (this._node.children) {
            this._node.children.forEach(child => {
                if (typeof child !== 'string'
                    && typeof child !== 'number'
                    && child.attributes
                    && typeof child.attributes.Id === 'string') {
                    const id = parseInt(child.attributes.Id.substr(3), 10);
                    if (id >= this._nextId)
                        this._nextId = id + 1;
                }
            });
        }
    }
    /**
     * Add a new relationship.
     * @param type - The type of relationship.
     * @param target - The target of the relationship.
     * @param [targetMode] - The target mode of the relationship.
     * @returns The new relationship.
     */
    add(type, target, targetMode) {
        const node = {
            name: 'Relationship',
            attributes: {
                Id: `rId${this._nextId++}`,
                Type: `${RELATIONSHIP_SCHEMA_PREFIX}${type}`,
                Target: target,
            },
        };
        if (targetMode) {
            node.attributes.TargetMode = targetMode;
        }
        if (!this._node.children)
            this._node.children = [];
        this._node.children.push(node);
        return node;
    }
    /**
     * Find a relationship by ID.
     * @param id - The relationship ID.
     * @returns The matching relationship or undefined if not found.
     */
    findById(id) {
        return this._node.children && this._node.children.find(node => {
            return !!(typeof node !== 'string'
                && typeof node !== 'number'
                && node.attributes
                && node.attributes.Id === id);
        });
    }
    /**
     * Find a relationship by type.
     * @param type - The type to search for.
     * @returns The matching relationship or undefined if not found.
     */
    findByType(type) {
        return this._node.children && this._node.children.find(node => {
            return !!(typeof node !== 'string'
                && typeof node !== 'number'
                && node.attributes
                && node.attributes.Type === `${RELATIONSHIP_SCHEMA_PREFIX}${type}`);
        });
    }
    /**
     * Convert the collection to an XML object.
     * @returns The XML or undefined if empty.
     */
    toXml() {
        if (!this._node.children || !this._node.children.length)
            return;
        return this._node;
    }
}
exports.Relationships = Relationships;
// tslint:disable
/*
xl/_rels/workbook.xml.rels

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
    <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain" Target="calcChain.xml"/>
    <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>
*/
//# sourceMappingURL=Relationships.js.map