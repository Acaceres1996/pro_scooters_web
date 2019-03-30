import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TOASTR_TOKEN } from '../../../services/toastr.service';
import { LookAndFeelService } from '../../../services/lookAndFeel.service';
import { LookAndFeel } from '../../../models/lookAndFeel';

@Component({
  selector: 'app-look-and-feel-new',
  templateUrl: './look-and-feel-new.component.html',
  styleUrls: ['./look-and-feel-new.component.scss']
})
export class LookAndFeelNewComponent implements OnInit {

  @Output() saveEvent:EventEmitter<string> = new EventEmitter();
  @Output() cancelEvent:EventEmitter<string> = new EventEmitter();
  
  constructor(@Inject(TOASTR_TOKEN) private toastr,
  private lookAndFeelService: LookAndFeelService) { }

  formGroup:FormGroup;
  saveDisabled:Boolean = true;

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        css: new FormControl('')
      })

      this.formGroup.statusChanges.subscribe(result => {
        this.saveDisabled = !(this.formGroup.dirty && this.formGroup.valid);
      })
    
  }

  guardar() {
    let lookAndFeel: LookAndFeel = new LookAndFeel();
    lookAndFeel.Id = 0;
    lookAndFeel.Name = this.formGroup.get('name').value;
    lookAndFeel.CSS = this.formGroup.get('css').value;
    
    this.lookAndFeelService.addItem(lookAndFeel).subscribe(result => {
      this.saveEvent.emit('reload');
    }, err => {
      this.toastr.error(err.message);
    })
    
  }

  cancelar() {
    this.cancelEvent.emit('');
  }
}
