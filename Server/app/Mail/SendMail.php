<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $data;
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $hi = 'Hello '.$this->data->login."!";
        $content = "Your recovery link: ".$this->data->link;
        return $this->markdown('Email.passwordReset')->subject('Password reminder')->with(['hi'=>$hi, 'content'=>$content]);
    }

}
