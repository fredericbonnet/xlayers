import { SourceCodeService } from './source-code.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { CoreModule } from 'src/app/core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export function onMonacoLoad() {
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ['node_modules/@types']
  });
}
export const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true, // Warning: this might have a severe performance impact,
    // fontFamily: 'Open Sans',
    fontSize: 15,
    fontLigatures: true,
    formatOnPaste: false,
    scrollBeyondLastLine: false,
    miniMap: {
      enabled: false
    }
  },
  onMonacoLoad
};

@NgModule({
  imports: [CommonModule, FormsModule, CoreModule, NoopAnimationsModule, MonacoEditorModule.forRoot(monacoConfig)],
  declarations: [EditorComponent],
  exports: [EditorComponent],
  providers: [SourceCodeService]
})
export class EditorModule {}