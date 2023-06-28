<tr>
  <td class="icon">
    <slot name="icon" />
  </td>
  <td class="name">
    <slot name="name" />
  </td>
  <td class="details">
    <slot name="details" />
  </td>
</tr>

<style>
  td { vertical-align: middle; }
  .icon { text-align: center; }
  .details {
    font-size: 0.9em;
    opacity: 0.85;
  }
</style>
