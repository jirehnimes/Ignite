<?php

namespace App\Listeners;

use App\Events\FeedCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class GetNewFeed
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  FeedCreated  $event
     * @return void
     */
    public function handle(FeedCreated $event)
    {
        //
    }
}
