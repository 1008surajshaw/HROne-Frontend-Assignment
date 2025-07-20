# JSON Schema Builder

A simple, interactive JSON schema builder that allows you to create and visualize multilevel JSON structures.

## Features

- Create nested JSON structures with unlimited depth
- Support for various data types (string, number, boolean, objectId, float, nesting)
- Real-time JSON preview
- Collapsible/expandable JSON view
- Copy JSON to clipboard

## How It Works

### Overall Flow

1. **JSON Creator Component**
   - Manages the tree structure of the JSON schema
   - Allows adding, editing, and deleting fields
   - Supports nested fields through the "nesting" type

2. **JSON Viewer Component**
   - Displays a real-time preview of the JSON structure
   - Allows collapsing/expanding the JSON view
   - Provides a copy-to-clipboard function

3. **Data Structure**
   - Uses a tree-based structure to represent the JSON schema
   - Each node has an ID, name, type, and references to parent/children
   - Nesting is handled by parent-child relationships

### Key Components

- **TreeState**: The core data structure that holds all nodes and their relationships
- **FieldRow**: Renders a single field with name and type inputs
- **JsonViewer**: Renders the JSON preview based on the current tree state

### Creating Nested Structures

1. Add a field by clicking "Add Field"
2. Change the field type to "nesting" (now default for nested fields)
3. Add nested fields by clicking "Add Nested Field" inside the parent field
4. Continue adding nested fields to create deeper structures

### Data Flow

```
User Action → Update Tree State → Generate JSON → Update Preview
```

## Implementation Details

- Tree operations are handled in `treeOperations.tsx`
- JSON generation is handled in `jsonGenerator.tsx`
- The UI is built with React components and minimal styling
- Error handling is implemented to prevent crashes when dealing with complex structures

## Tips

- Use the "Load Example" button to see a sample JSON structure
- Nested fields are automatically created with the "nesting" type
- You can collapse/expand sections to manage complex structures
- The JSON preview updates in real-time as you make changes