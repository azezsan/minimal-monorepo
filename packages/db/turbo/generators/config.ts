import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('capitalize', (name: string) => name.charAt(0).toUpperCase() + name.slice(1));
  plop.setHelper('singularize', (name: string) => (name.endsWith('s') ? name.slice(0, -1) : name));
  plop.setGenerator('schema', {
    description: 'Generate a new database schema with validation',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the schema? (This will be used as the table name)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/schema/{{ name }}/{{ name }}.ts',
        templateFile: 'templates/schema.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/schema/{{ name }}/validation.ts',
        templateFile: 'templates/validation.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/schema/{{ name }}/index.ts',
        templateFile: 'templates/index.ts.hbs'
      }
    ]
  });
}
