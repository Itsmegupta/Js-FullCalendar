import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; 
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JamTech';
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin]
  // };

  @ViewChild('calendar') calendarComponent?: FullCalendarComponent; 

  calendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin,listPlugin, interactionPlugin, resourceTimeGridPlugin],
    events: [] as EventInput[], 
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      right: 'dayGridMonth,listYear',
      center: 'title',
    },
    validRange: {
      start: new Date().toISOString().split('T')[0] 
    },
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    };
    
    handleDateClick(arg: any) {
      const formattedDate = new Date().toISOString().split('T')[0];
      console.log(formattedDate);
      
      const eventName = prompt(`Enter event name for ${formattedDate}:`);
      if (eventName) {
        const newEvent: EventInput = {
          title: eventName,
          start: arg.date,
          allDay: arg.allDay
        };
        this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
        this.calendarComponent?.getApi().render();
      }
    }
    
    handleEventClick(arg: any) {
      const formattedDate = new Date().toISOString().split('T')[0];
      const action = prompt(`Edit or delete event on ${formattedDate}? (e/d)`, 'e');
      if (action === null) {
        return; 
      }

      if (action === 'e') {
        const newEventName = prompt(`Edit event name for ${formattedDate}:`, arg.event.title);
        if (newEventName) {
          arg.event.setProp('title', newEventName);
        }
      } else if (action === 'd') {
        if (confirm('Are you sure you want to delete this event?')) {
          arg.event.remove();
        }
      }else {
        alert('Invalid input. Please enter "e" to edit or "d" to delete.');
      }
    }
}
