using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Golf.Models;

namespace Golf.Controllers
{
    // All of these routes will be at the base URL:     /api/Player
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case PlayerController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public PlayerController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Player
        //
        // Returns a list of all your Players
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            // Uses the database context in `_context` to request all of the Players, sort
            // them by row id and return them as a JSON array.
            return await _context.Players.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Player/5
        //
        // Fetches and returns a specific player by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            // Find the player in the database using `FindAsync` to look it up by id
            var player = await _context.Players.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (player == null)
            {
                // Return a `404` response to the client indicating we could not find a player with this id
                return NotFound();
            }

            //  Return the player as a JSON object.
            return player;
        }

        // PUT: api/Player/5
        //
        // Update an individual player with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Player
        // variable named player. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Player POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(int id, Player player)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != player.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in player to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from player
            _context.Entry(player).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!PlayerExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(player);
        }

        // POST: api/Player
        //
        // Creates a new player in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Player
        // variable named player. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Player POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            // Indicate to the database context we want to add this new record
            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
        }

        // DELETE: api/Player/5
        //
        // Deletes an individual player with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            // Find this player by looking for the specific id
            var player = await _context.Players.FindAsync(id);
            if (player == null)
            {
                // There wasn't a player with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Players.Remove(player);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(player);
        }

        // Private helper method that looks up an existing player by the supplied id
        private bool PlayerExists(int id)
        {
            return _context.Players.Any(player => player.Id == id);
        }
    }
}
